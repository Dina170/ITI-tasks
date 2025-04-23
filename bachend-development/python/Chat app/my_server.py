from web_socket_server import WebSocket, Server
import json

clients = []

class MyChatApp(WebSocket):
    connected_clients = {}  # Store username and connection pairs
    
    def handle_message(self):
        message = json.loads(self.data)
        if message.get('messageType') == 'status':
            if 'connected' in message.get('text'):
                MyChatApp.connected_clients[message['user']] = self
                # Broadcast updated client list
                self.broadcast_client_list()
            elif 'offline' in message.get('text'):
                MyChatApp.connected_clients.pop(message['user'])
                self.broadcast_client_list()
        else:
            self.broadcast_message(message)
    
    def broadcast_message(self, message):
        for client in clients:
            if client != self:
                client.send_message(message)
                
    def broadcast_client_list(self):
        client_list = list(MyChatApp.connected_clients.keys())
        message = {
            'messageType': 'clients',
            'clients': client_list
        }
        for client in clients:
            client.send_message(message)
            
    def send_message(self, message):
        if isinstance(message, (dict, list)):
            message = json.dumps(message)
        super().send_message(message)
            
    def handle_connected(self):
        print(self)
        clients.append(self)
        
    def handle_close(self):
        # Remove client from connected clients
        for username, client in MyChatApp.connected_clients.items():
            if client == self:
                MyChatApp.connected_clients.pop(username)
                break
        if self in clients:
            clients.remove(self)
        self.broadcast_client_list()
        

server = Server(host='localhost', port=8080, websocketclass=MyChatApp)
server.serveforever()