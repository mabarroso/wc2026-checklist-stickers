use tauri::{Manager, command};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
struct Sticker {
    id: String,
    name: String,
    team: String,
    // Add other fields as needed for export
}

#[command]
fn export_pdf(stickers: Vec<Sticker>) -> Result<String, String> {
    // For now, we'll create a simple text file as placeholder
    // In a real implementation, you would use a PDF library
    let downloads_dir = dirs::download_dir()
        .ok_or_else(|| "Could not find downloads directory".to_string())?;
    
    let file_path = downloads_dir.join("panini_wc_2026_missing.pdf");
    
    // Simple text content for demo
    let mut content = String::from("Panini FIFA World Cup 2026 - Cromos Faltantes\n\n");
    for sticker in stickers {
        content.push_str(&format!("[{}] {} - {}\n", sticker.id, sticker.name, sticker.team));
    }
    
    fs::write(&file_path, content)
        .map_err(|e| format!("Failed to write PDF: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

#[command]
fn export_csv(stickers: Vec<Sticker>) -> Result<String, String> {
    let downloads_dir = dirs::download_dir()
        .ok_or_else(|| "Could not find downloads directory".to_string())?;
    
    let file_path = downloads_dir.join("panini_wc_2026_missing.csv");
    
    // CSV header
    let mut content = String::from("ID,Nombre,Equipo\n");
    for sticker in stickers {
        content.push_str(&format!("{},{},{}\n", sticker.id, sticker.name, sticker.team));
    }
    
    fs::write(&file_path, content)
        .map_err(|e| format!("Failed to write CSV: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

#[command]
fn export_txt(stickers: Vec<Sticker>) -> Result<String, String> {
    let downloads_dir = dirs::download_dir()
        .ok_or_else(|| "Could not find downloads directory".to_string())?;
    
    let file_path = downloads_dir.join("panini_wc_2026_missing.txt");
    
    // Simple text list
    let mut content = String::new();
    for sticker in stickers {
        content.push_str(&format!("[{}] {} - {}\n", sticker.id, sticker.name, sticker.team));
    }
    
    fs::write(&file_path, content)
        .map_err(|e| format!("Failed to write TXT: {}", e))?;
    
    Ok(file_path.to_string_lossy().to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![export_pdf, export_csv, export_txt])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            window.set_title("Panini WC 2026 Checklist").unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}