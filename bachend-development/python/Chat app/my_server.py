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
        else:
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
            
    # def send_message(self, message):
    #     if isinstance(message, (dict, list)):
    #         message = json.dumps(message)
    #     super().send_message(message)
            
    def handle_connected(self):
        print(self)
        
    def handle_close(self):
        if self in clients:
            del clients[self]
        self.send_client_list()
        

server = Server(host='localhost', port=8080, websocketclass=MyChatApp)
server.serveforever()