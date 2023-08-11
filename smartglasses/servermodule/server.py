from SimpleHTTPServer import *
import time as t
import SocketServer
#import html
ip = "192.168.3.45"
name = "RaspZeroW"
print("ip = " + ip)
print("name = " + name)
print("Press Ctrl+C to Exit")

class RequestHandler_httpd(SimpleHTTPRequestHandler):
  def do_GET(self):
    global coin
    no_ok = True
    while(no_ok):
        message = "html"
        if(message != ""):
            #messagetosend = html.open(message)
            messagetosend = ["<h1>testing"]
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            for i in messagetosend:
                self.wfile.write(i)
            no_ok = False
            return
        else:
            no_ok = True
def setup():
    server_address_httpd = ('0.0.0.0',8000)
    httpd = SocketServer.TCPServer(server_address_httpd, RequestHandler_httpd)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
       print("Server Exited")
setup()