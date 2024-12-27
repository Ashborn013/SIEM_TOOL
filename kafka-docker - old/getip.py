import socket
def get_ip():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address


system_ip = get_ip()
print(system_ip)