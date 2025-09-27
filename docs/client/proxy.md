# Proxies

The Kraken launcher support SOCKS5 proxies. If you are unfamiliar with what a proxy is, a proxy is simply an intermediate machine
which accepts internet traffic from one machine and forward the traffic to another machine. Proxies for RuneLite and Kraken are primarily used for concealing IP and location
information from Jagex.

For example if I wanted to pretend I was in Russia, I could purchase a proxy in Russia and configure Kraken to send all my RuneLite client traffic through
the Russian computer before it reached Jagex's servers. When Jagex see's my connection it will appear as though I am on 
vacation is Russia (or at least that's the general idea)!

To configure a proxy for Kraken open the launcher configuration window and in the proxy field enter your ip and port.
For example `192.168.50.13:4355`. Kraken also supports proxies with authentication. Simply add a user and password to the end of
your proxy string: `192.168.50.13:5555:user:password` to enable proxy authentication.

![kraken-proxy](../images/kraken-proxy.png)