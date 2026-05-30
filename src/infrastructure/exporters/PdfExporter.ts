import PDFDocument from 'pdfkit';
import { homedir } from 'os';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import type { Sticker } from '../../domain/entities/Sticker';
import { BaseExporter } from './BaseExporter';

export interface PdfExporterOptions {
  stickers: Sticker[];
  filename?: string;
  mode?: 'full' | 'ids-only';
}

export class PdfExporter extends BaseExporter {
  private mode: 'full' | 'ids-only';
  private stickersPerPage: number = 40;
  private rowsPerColumn: number = 20;

  constructor(options: PdfExporterOptions) {
    super(options);
    this.mode = options.mode ?? 'full';
  }

  protected getExtension(): string {
    return 'pdf';
  }

  protected generateContent(): string | Buffer {
    return Buffer.from([]);
  }

  async export(destination: string = 'downloads'): Promise<string> {
    const path = this.getDestinationPath(destination);
    const dir = join(homedir(), 'Downloads');

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    const fullPath = destination === 'downloads' ? join(dir, `${this.filename}.pdf`) : path;

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 30 });
      const stream = require('fs').createWriteStream(fullPath);

      doc.pipe(stream);

      this.renderContent(doc);

      doc.end();

      stream.on('finish', () => resolve(fullPath));
      stream.on('error', reject);
    });
  }

  private renderContent(doc: PDFKit.PDFDocument): void {
    if (this.mode === 'ids-only') {
      this.renderCompact(doc);
    } else {
      this.renderFull(doc);
    }
  }

  private renderFull(doc: PDFKit.PDFDocument): void {
    const pageWidth = doc.page.width - 60;
    const colWidth = pageWidth / 2;
    const startX = 30;
    const startY = 50;
    const rowHeight = 20;
    const checkboxSize = 12;

    let currentPage = 1;
    const totalPages = Math.ceil(this.stickers.length / this.stickersPerPage);

    this.renderHeader(doc, currentPage, totalPages, 'full');

    for (let i = 0; i < this.stickers.length; i++) {
      const sticker = this.stickers[i];
      const indexOnPage = i % this.stickersPerPage;
      const col = Math.floor(indexOnPage / this.rowsPerColumn);
      const row = indexOnPage % this.rowsPerColumn;

      if (indexOnPage > 0 && indexOnPage % this.stickersPerPage === 0) {
        doc.addPage();
        currentPage++;
        this.renderHeader(doc, currentPage, totalPages, 'full');
      }

      const x = startX + col * colWidth;
      const y = startY + 30 + row * rowHeight;

      doc.rect(x, y, checkboxSize, checkboxSize).stroke();

      const textX = x + checkboxSize + 5;
      const textWidth = colWidth - checkboxSize - 10;

      doc.fontSize(8).fillColor('#000');

      const idText = `[${sticker.id}]`;
      const nameText = ` ${sticker.name}`;
      const teamText = ` - ${sticker.team}`;

      let truncatedId = idText;
      const fullText = idText + nameText + teamText;

      if (doc.widthOfString(fullText) > textWidth) {
        const maxNameLen = Math.floor((textWidth - doc.widthOfString(idText) - doc.widthOfString(teamText)) / 5);
        truncatedId = idText + nameText.substring(0, Math.max(5, maxNameLen)) + '..';
      }

      doc.text(truncatedId + teamText, textX, y, {
        width: textWidth,
        continued: false,
      });
    }
  }

  private renderCompact(doc: PDFKit.PDFDocument): void {
    const pageWidth = doc.page.width - 60;
    const checkboxSize = 8;
    const cols = 8;
    const colWidth = pageWidth / cols;
    const rowHeight = 6;
    const rowsPerPage = 45;
    const stickersPerPage = cols * rowsPerPage;
    const startX = 30;
    const startY = 50;

    let currentPage = 1;
    const totalPages = Math.ceil(this.stickers.length / stickersPerPage);

    this.renderHeader(doc, currentPage, totalPages, 'ids-only');

    for (let i = 0; i < this.stickers.length; i++) {
      const sticker = this.stickers[i];
      const indexOnPage = i % stickersPerPage;
      const col = indexOnPage % cols;
      const row = Math.floor(indexOnPage / cols);

      if (indexOnPage > 0 && indexOnPage % stickersPerPage === 0) {
        doc.addPage();
        currentPage++;
        this.renderHeader(doc, currentPage, totalPages, 'ids-only');
      }

      const x = startX + col * colWidth;
      const y = startY + 25 + row * rowHeight;

      doc.rect(x, y, checkboxSize, checkboxSize).stroke();

      const textX = x + checkboxSize + 2;
      doc.fontSize(7).fillColor('#000');
      doc.text(sticker.id, textX, y, { width: colWidth - checkboxSize - 4, continued: false });
    }
  }

  private renderHeader(doc: PDFKit.PDFDocument, currentPage: number, totalPages: number, mode: 'full' | 'ids-only'): void {
    const pageWidth = doc.page.width;

    const title = mode === 'ids-only' ? 'WC 2026 (Solo IDs)' : 'WC 2026';
    doc.fontSize(14).fillColor('#1a1a2e');
    doc.text(title, 30, 20, { align: 'center', width: pageWidth - 60 });

    doc.fontSize(10).fillColor('#666');
    doc.text(`${this.label} - Página ${currentPage}/${totalPages}`, 30, 38, { align: 'center', width: pageWidth - 60 });

    doc.moveTo(30, 48).lineTo(pageWidth - 30, 48).stroke();
  }
}