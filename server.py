from http.server import HTTPServer, SimpleHTTPRequestHandler
import mimetypes
import os

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("text/html", ".html")

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="static", **kwargs)

    def do_GET(self):
        # Normalize path
        clean_path = self.path.split('?')[0]  # Remove query strings
        file_path = os.path.join(self.directory, clean_path.lstrip('/'))

        # Handle /javadoc/* paths
        if clean_path.startswith('/javadoc'):
            # If it's exactly /javadoc or /javadoc/, serve index.html
            if clean_path == '/javadoc' or clean_path == '/javadoc/':
                self.path = '/javadoc/index.html'
                return super().do_GET()

            # For any other /javadoc/* path, try to serve the file directly
            if os.path.isfile(file_path):
                return super().do_GET()

            # If file doesn't exist and it's a directory, try index.html in that directory
            if os.path.isdir(file_path):
                index_path = os.path.join(file_path, 'index.html')
                if os.path.isfile(index_path):
                    self.path = clean_path.rstrip('/') + '/index.html'
                    return super().do_GET()

            # If nothing found, return 404
            self.send_error(404, "File not found")
            return

        # Handle /docs/* paths
        if clean_path.startswith('/docs'):
            # If it's exactly /docs or /docs/, serve index.html
            if clean_path == '/docs' or clean_path == '/docs/':
                self.path = '/docs/index.html'
                return super().do_GET()

            # For any other /docs/* path, try to serve the file directly
            if os.path.isfile(file_path):
                return super().do_GET()

            # If file doesn't exist and it's a directory, try index.html in that directory
            if os.path.isdir(file_path):
                index_path = os.path.join(file_path, 'index.html')
                if os.path.isfile(index_path):
                    self.path = clean_path.rstrip('/') + '/index.html'
                    return super().do_GET()

            # For docs, fall back to /docs/index.html (for client-side routing)
            self.path = '/docs/index.html'
            return super().do_GET()

        # For all other paths - handle as SPA
        # If the file exists (static assets like .js, .css, images), serve it
        if os.path.isfile(file_path):
            return super().do_GET()

        # Otherwise, serve the SPA's index.html (for client-side routing)
        self.path = '/index.html'
        return super().do_GET()

    def guess_type(self, path):
        base, ext = os.path.splitext(path)
        if ext in ['.js', '.mjs']:
            return 'application/javascript'
        if ext == '.css':
            return 'text/css'
        return super().guess_type(path)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run(server_class=HTTPServer, handler_class=SPAHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving SPA on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()