from web_socket_server import WebSocket, Server
import json

clients = {}

class MyChatApp(WebSocket):
    def handle_message(self):
        message = self.data
        message_data = json.loads(message)
        if message_data.get('messageType') == 'status':
            clients[self] = message_data.get('user')
            self.send_client_list()
        self.send_to_others(message)
    
    def send_to_others(self, message):
        for client in clients:
            if client != self:
                client.send_message(message)
                
    def send_client_list(self):
        client_list = list(clients.values())
        message = {
            'messageType': 'clients',
            'clients': client_list
        }
        for client in clients:
            client.send_message(json.dumps(message))
            
    def send_status(self, user, text):
        message = {
            "user": user,
            "text": text,
            "messageType": "status"
        }
        for client in clients:
            client.send_message(json.dumps(message))
                        
    def handle_connected(self):
        print(self)
        
    def handle_close(self):
        username = clients.get(self)
        if self in clients:
            del clients[self]
        self.send_status(username, "is offline")        
        self.send_client_list()
        

server = Server(host='localhost', port=8080, websocketclass=MyChatApp)
server.serveforever()