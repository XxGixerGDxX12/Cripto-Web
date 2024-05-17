import http.server
import socketserver

def run_server():
    try:
        # Pedir al usuario que introduzca el puerto
        port = int(input("Introduce el puerto en el que deseas iniciar el servidor: "))

        # Definimos una clase de manejador que maneja las peticiones HTTP
        Handler = http.server.SimpleHTTPRequestHandler

        # Creamos el servidor TCP
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print(f"Servidor iniciado en el puerto {port}")
            print(f"Accede a la URL: http://localhost:{port}")
            try:
                # Mantenemos el servidor en funcionamiento
                httpd.serve_forever()
            except KeyboardInterrupt:
                # Si se interrumpe el servidor, lo cerramos adecuadamente
                print("\nServidor detenido.")
                httpd.server_close()
    except ValueError:
        print("Por favor, introduce un número válido para el puerto.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_server()
