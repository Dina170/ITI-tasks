from web_socket_server import WebSocket, Server

clients = []

class MyChatApp(WebSocket):
    def handle_message(self):
        for client in clients:
            if client != self:
                client.send_message(self.data)
        # self.send_message("Connected to server")
        
    def handle_connected(self):
        clients.append(self)
        
    def handle_close(self):
        self.send_message("Connection closed")
        

server = Server(host='localhost', port=8080, websocketclass=MyChatApp)
server.serveforever()