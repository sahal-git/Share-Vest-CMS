import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8 prose prose-sm max-w-none">
      <h1>API Documentation</h1>
      
      <h2>Endpoints</h2>
      
      <Card className="p-6 mb-6">
        <h3 className="flex items-center gap-2 mt-0">
          GET /api/courses
          <Badge>GET</Badge>
        </h3>
        <p>Retrieves all courses.</p>
        <h4>Response</h4>
        <pre className="bg-muted p-4 rounded-lg">
          {JSON.stringify([
            {
              id: 1,
              name: "Course Name",
              imageCode: "CODE",
              imageUrl: "URL",
              category: "Category",
              enrolled: true,
              chapters: [
                { id: 1, title: "Chapter 1", videoUrl: "URL" }
              ]
            }
          ], null, 2)}
        </pre>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="flex items-center gap-2 mt-0">
          POST /api/courses
          <Badge variant="secondary">POST</Badge>
        </h3>
        <p>Creates a new course.</p>
        <h4>Request Body</h4>
        <pre className="bg-muted p-4 rounded-lg">
          {JSON.stringify({
            name: "Course Name",
            imageCode: "CODE",
            imageUrl: "URL",
            category: "Category",
            chapters: []
          }, null, 2)}
        </pre>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="flex items-center gap-2 mt-0">
          PUT /api/courses
          <Badge variant="secondary">PUT</Badge>
        </h3>
        <p>Updates an existing course.</p>
        <h4>Request Body</h4>
        <pre className="bg-muted p-4 rounded-lg">
          {JSON.stringify({
            id: 1,
            name: "Updated Course Name",
            imageCode: "CODE",
            imageUrl: "URL",
            category: "Category",
            chapters: []
          }, null, 2)}
        </pre>
      </Card>

      <Card className="p-6">
        <h3 className="flex items-center gap-2 mt-0">
          DELETE /api/courses
          <Badge variant="destructive">DELETE</Badge>
        </h3>
        <p>Deletes a course.</p>
        <h4>Request Body</h4>
        <pre className="bg-muted p-4 rounded-lg">
          {JSON.stringify({
            id: 1
          }, null, 2)}
        </pre>
      </Card>
    </div>
  );
}