import { useParams } from "react-router-dom";
import { getJobItem } from "../api/jobItems";
import { useEffect, useState } from "react";

export default function JobItemDetailPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getJobItem(itemId).then(setItem);
  }, [itemId]);

  if (!item) return "Loading...";

  return (
    <div>
      <h2>Item {item.id}</h2>
      <p>Status: {item.status}</p>
      {item.failureReason && <p>❌ {item.failureReason}</p>}

      <p>
        <strong>Assets:</strong>
      </p>
      {item.pngUrl && <a href={item.pngUrl}>PNG</a>}
      <br />
      {item.pdfUrl && <a href={item.pdfUrl}>PDF</a>}
      <br />
      {item.docxUrl && <a href={item.docxUrl}>DOCX</a>}
      <br />

      <h3>resumeJson</h3>
      <pre>{JSON.stringify(item.resumeJson, null, 2)}</pre>
    </div>
  );
}
