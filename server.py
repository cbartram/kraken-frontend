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
        # Check if the requested file exists in static directory
        file_path = os.path.join(self.directory, self.path.lstrip('/'))

        # If the path is for a static file that exists (like .js, .css, images), serve it
        if os.path.isfile(file_path):
            return super().do_GET()

        if os.path.isdir(file_path):
            # If it doesn't end in a slash, redirect to add one.
            # This is crucial for Javadoc's relative links to work.
            if not self.path.endswith('/'):
                self.send_response(301)
                self.send_header('Location', self.path + '/')
                self.end_headers()
                return

            # If it is a directory and ends with a slash,
            # try to serve its index.html file
            index_file = os.path.join(file_path, 'index.html')

            # This will check for /app/static/javadoc/index.html
            if os.path.isfile(index_file):
                self.path = os.path.join(self.path, 'index.html')
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