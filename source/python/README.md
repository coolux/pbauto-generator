## Requirements
* Python (tested on 3, 2 should work as well)
* coolux Pandoras Box

## Installation
The code is currently distributed as a single file. There might be a pip package in the future.

## Usage
The PBAuto class expects a connector in the constructor. Currently there is only the TCP connector.

```python
import pbauto

# Use Tcp Connector
ip = "127.0.0.1"
domain = 0

connector = Tcp(ip, domain) # domain is optional
pb = pbauto.PBAuto(connector)

# ... or use the convenience function
pb = pbauto.PBAuto.connect_tcp(ip, domain)
```

You can then proceed to use all api functions.

```python
pb.get_selected_device_count()
# returns {'selectedDevicesCount': 2, 'ok': True, 'code': 81}
```

## Message Generator
The python file also allows you to generate the messages required to control Pandoras Box. The idea is that you can generate the message code with the python code and then use it in 3rd party tools that are able to send TCP messages. There are a couple of formattings available:

- **hex**: A simple HEX representation
- **PB**: Pandoras Box Serial Link device compatible message (*use the HEX setting*)
- **WD**: The Widget Designer Hex code style [hXX]
- **cpp** C++ compatible hex code for arrays

It is important to know that the message changes if the PB Domain changes. As long as you keep the Domain, you can use the same message code.

```
pb = PBAuto.offline_tcp(data_format='pb')
pb.reset_all()

# prints "[h50] [h42] [h41] [h55] [h01] [h00] [h00] [h00] [h00] [h00] [h02] [h00] [h00] [h00] [h00] [h00] [h03] [h00] [h09]"
```