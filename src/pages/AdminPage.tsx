import { useMemo, useState } from 'react';
import {
  courseTemplateHeader,
  getCourseTemplateCsv,
  importCourses,
  loadStudentData,
  parseCsv,
  resetStudentData,
} from '../api/dataStore';

export function AdminPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsedCourses, setParsedCourses] = useState<string[]>([]);
  const data = useMemo(() => loadStudentData(), []);

  const handleTemplateDownload = () => {
    const blob = new Blob([getCourseTemplateCsv()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fuv-course-template.csv');
    link.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    setMessage(null);

    const text = await file.text();
    try {
      const courses = parseCsv(text);
      importCourses(courses);
      setParsedCourses(courses.map((c) => `${c.courseCode} - ${c.title}`));
      setMessage(`Imported ${courses.length} courses and saved to local storage.`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleReset = () => {
    resetStudentData();
    setMessage('Data reset to seeded defaults.');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">Admin / Settings</h1>
      <p className="text-gray-600 mb-6">
        Import CSV/JSON exports from your Google Sheet to update the planner without touching code. Data is stored locally in
        your browser.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Download course data template</h2>
          <p className="text-sm text-gray-600 mb-3">Headers: {courseTemplateHeader}</p>
          <button
            onClick={handleTemplateDownload}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-900"
          >
            Download CSV template
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Upload filled CSV</h2>
          <p className="text-sm text-gray-600 mb-3">Paste data from Google Sheets/Excel and export as CSV first.</p>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {message && <div className="mb-4 p-3 bg-green-50 text-green-800 rounded border border-green-200 text-sm">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 text-red-800 rounded border border-red-200 text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Most recent import</h3>
          <button onClick={handleReset} className="text-sm text-red-600 hover:underline">
            Reset to defaults
          </button>
        </div>
        {parsedCourses.length === 0 ? (
          <p className="text-sm text-gray-600">No new import yet. Current courses in store: {data.courses.length}</p>
        ) : (
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {parsedCourses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Workflow tips</h3>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Keep a Google Sheet with the fixed header row shown above.</li>
          <li>Export as CSV each semester and upload here.</li>
          <li>Data is stored locally; share the CSV with students to import into their own browsers.</li>
          <li>
            Optional: add a simple Node script later to validate rows before upload (reusing the same header order and the
            parseCsv helper).
          </li>
        </ol>
      </div>
    </div>
  );
}
