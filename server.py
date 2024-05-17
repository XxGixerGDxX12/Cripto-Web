import http.server
import socketserver

# Definimos el puerto en el que el servidor escuchará
PORT = 8080

# Definimos una clase de manejador que maneja las peticiones HTTP
Handler = http.server.SimpleHTTPRequestHandler

# Creamos el servidor TCP
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor iniciado en el puerto {PORT}")
    try:
        # Mantenemos el servidor en funcionamiento
        httpd.serve_forever()
    except KeyboardInterrupt:
        # Si se interrumpe el servidor, lo cerramos adecuadamente
        print("\nServidor detenido.")
        httpd.server_close()
