from ldap3 import Server, Connection, ALL

server = Server('odin.kuben.it', get_info=ALL)
conn = Connection(server, user="kuben\\simen", password="Q2w3e4r5")

conn.bind()

print(conn.extend.standard.who_am_i())

conn.search('dc=kuben,dc=it', '(&(ObjectClass=user)(GivenName=*))', attributes=['sn', 'objectclass', 'cn'])

names = [name.cn.value for name in conn.entries]

print(names)

conn.unbind()
