import { Upload, FileImage, FileText, Download } from "lucide-react";

export default function FilesList({ files, uploading, onUpload }) {
  return (
    <section className="rounded-[28px] bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Files & Assets</h2>

        <label className="cursor-pointer rounded-lg p-2 text-indigo-600 hover:bg-indigo-50">
          <Upload className="h-5 w-5" />
          <input
            type="file"
            className="hidden"
            onChange={onUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {uploading && (
        <p className="mt-4 text-xs text-indigo-600">Uploading...</p>
      )}

      <div className="mt-6 space-y-3">
        {files.map((file, index) => (
          <div
            key={file.id || file.name || index}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              {file.name?.endsWith(".pdf") ? (
                <FileText className="h-5 w-5" />
              ) : (
                <FileImage className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{file.name}</p>
              <p className="mt-1 text-xs text-slate-400">{file.size || ""}</p>
            </div>

            {file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-indigo-600"
              >
                <Download className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}

        {files.length === 0 && (
          <p className="py-5 text-sm text-slate-400">No files uploaded yet.</p>
        )}
      </div>
    </section>
  );
}
