use tauri::{AppHandle, Manager, command};
use serde::{Deserialize, Serialize};
use std::fs::{self, File, create_dir_all};
use std::io::BufWriter;
use printpdf::*;

#[cfg(not(any(target_os = "android", target_os = "ios")))]
use std::process::Command;

use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Sticker {
    id: String,
    name: String,
    team: String,
}

fn get_export_dir(app: &AppHandle) -> Result<PathBuf, String> {
    #[cfg(any(target_os = "android", target_os = "ios"))]
    {
        let data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
        Ok(data_dir)
    }

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        let _ = &app;
        let downloads_dir = dirs::download_dir()
            .ok_or_else(|| "No se encontró la carpeta de descargas".to_string())?;
        Ok(downloads_dir)
    }
}

#[command]
fn export_pdf(app: AppHandle, stickers: Vec<Sticker>) -> Result<String, String> {
    let export_dir = get_export_dir(&app)?;

    create_dir_all(&export_dir).map_err(|e| format!("Error al crear directorio: {}", e))?;

    let file_path: PathBuf = export_dir.join("faltantes.pdf");

    let (doc, page1, layer1) = PdfDocument::new(
        "Cromos Faltantes - Panini WC 2026",
        Mm(210.0),
        Mm(297.0),
        "Layer 1",
    );

    let current_layer = doc.get_page(page1).get_layer(layer1);

    let font = doc.add_builtin_font(BuiltinFont::Helvetica).map_err(|e| e.to_string())?;
    let font_bold = doc.add_builtin_font(BuiltinFont::HelveticaBold).map_err(|e| e.to_string())?;

    current_layer.use_text("PANINI FIFA WORLD CUP 2026 - CROMOS FALTANTES", 16.0, Mm(10.0), Mm(277.0), &font_bold);
    current_layer.use_text(&format!("Total: {} cromos", stickers.len()), 12.0, Mm(10.0), Mm(267.0), &font);

    const COLS: usize = 2;
    const ROWS: usize = 35;
    const STICKERS_PER_PAGE: usize = COLS * ROWS;

    let chunks: Vec<_> = stickers.chunks(STICKERS_PER_PAGE).collect();
    let total_pages = chunks.len();

    for (page_idx, chunk) in chunks.iter().enumerate() {
        let layer = if page_idx == 0 {
            current_layer.clone()
        } else {
            let (new_page_idx, new_layer_idx) = doc.add_page(Mm(210.0), Mm(297.0), "Layer 1");
            let new_page_ref = doc.get_page(new_page_idx);
            new_page_ref.get_layer(new_layer_idx)
        };

        if total_pages > 1 {
            layer.use_text(&format!("Página {} de {}", page_idx + 1, total_pages), 10.0, Mm(100.0), Mm(287.0), &font);
        }

        let start_y = 250.0;
        let col_width = 90.0;
        let row_height = 7.0;

        for (i, sticker) in chunk.iter().enumerate() {
            let col = i % COLS;
            let row = i / COLS;

            let x = 10.0 + (col as f32 * col_width);
            let y = start_y - (row as f32 * row_height);

            layer.use_text(&format!("[ ]"), 10.0, Mm(x), Mm(y), &font);
            layer.use_text(&format!("{} - {}", sticker.id, sticker.name), 8.0, Mm(x + 8.0), Mm(y), &font);
        }
    }

    let file = File::create(&file_path).map_err(|e| format!("Error al crear archivo: {}", e))?;
    let mut buf_writer = BufWriter::new(file);
    doc.save(&mut buf_writer).map_err(|e| format!("Error al guardar PDF: {}", e))?;

    Ok(file_path.to_string_lossy().to_string())
}

#[command]
fn export_csv(app: AppHandle, stickers: Vec<Sticker>) -> Result<String, String> {
    let export_dir = get_export_dir(&app)?;

    let file_path = export_dir.join("faltantes.csv");

    let mut content = String::from("ID,Nombre,Equipo\n");
    for sticker in stickers {
        content.push_str(&format!("{},{},{}\n", sticker.id, sticker.name, sticker.team));
    }

    fs::write(&file_path, content)
        .map_err(|e| format!("Error al escribir CSV: {}", e))?;

    Ok(file_path.to_string_lossy().to_string())
}

#[command]
fn export_txt(app: AppHandle, stickers: Vec<Sticker>) -> Result<String, String> {
    let export_dir = get_export_dir(&app)?;

    let file_path = export_dir.join("faltantes.txt");

    let mut content = String::from("PANINI FIFA WORLD CUP 2026 - CROMOS FALTANTES\n\n");
    for sticker in stickers {
        content.push_str(&format!("[{}] {} - {}\n", sticker.id, sticker.name, sticker.team));
    }

    fs::write(&file_path, content)
        .map_err(|e| format!("Error al escribir TXT: {}", e))?;

    Ok(file_path.to_string_lossy().to_string())
}

#[cfg(not(any(target_os = "android", target_os = "ios")))]
#[cfg(target_os = "windows")]
fn open_folder(path: &std::path::Path) -> Result<(), String> {
    Command::new("explorer")
        .arg(path)
        .spawn()
        .map_err(|e| format!("Error al abrir carpeta: {}", e))?;
    Ok(())
}

#[cfg(not(any(target_os = "android", target_os = "ios")))]
#[cfg(target_os = "macos")]
fn open_folder(path: &std::path::Path) -> Result<(), String> {
    Command::new("open")
        .arg(path)
        .spawn()
        .map_err(|e| format!("Error al abrir carpeta: {}", e))?;
    Ok(())
}

#[cfg(not(any(target_os = "android", target_os = "ios")))]
#[cfg(target_os = "linux")]
fn open_folder(path: &std::path::Path) -> Result<(), String> {
    Command::new("xdg-open")
        .arg(path)
        .spawn()
        .map_err(|e| format!("Error al abrir carpeta: {}", e))?;
    Ok(())
}

#[cfg(not(any(target_os = "android", target_os = "ios")))]
#[command]
fn open_downloads_folder(app: AppHandle) -> Result<(), String> {
    let export_dir = get_export_dir(&app)?;

    open_folder(&export_dir)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            export_pdf,
            export_csv,
            export_txt,
            #[cfg(not(any(target_os = "android", target_os = "ios")))]
            open_downloads_folder,
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            window.set_title("Panini WC 2026 Checklist").unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}