
try:
    import RPI.GPIO as GPIO
    
except:
    print("Error : please run this python app in raspberry pi Zero W!")
print(GPIO.RPI_INFO)
import time

ConnectMode = "B"   #S:Server,B:bluetooth



# Pip install pybluez 

if ConnectMode == "S":
    import servermodule.server as server
else:
    try:
        import bluetooth
    except:
        print("Bluetooth Module is not installed,please install: python pip install pybluez or sudo apt-get install bluetooth bluez python-bluez")


switch = None #Port of switch
LightL = None #Left Light
LightR = None #Right Light
LightS = None #Status Light
mode = "l"

bt_p =  None #Plus button
bt_s = None #subbtract buttons

push_l_p = None #push left plus
push_l_s = None #push left subtract
push_r_p = None #push right plus
push_r_s = None #push right subtract

client_sock = None
port = 0
address = None
GPIO.setmode(GPIO.BCM)

GPIO.setup(switch, GPIO.IN)


# functions
def bluetoothsetup():
    global client_sock,address,connected
    client_sock= bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    global port 
    port= 22
    client_sock.bind(("",port))
    client_sock.listen(1)
    client_sock,address = client_sock.accept()
    GPIO.output(LightS,True)
    print("Bluetooth Connected,adr:" ,address)
def BluetoothOnReceive(receive):
    controlname = "Error"
    if receive == "lp":
        leftmotor(1)
        controlname = "Left Plus"
    if receive == "ls":
        leftmotor(-1)
        controlname = "Left Subtract"
    if receive == "rp":
        rightmotor(1)
        controlname = "Right Plus"
    if receive == "rs":
        rightmotor(-1)
        controlname = "Right Subtract"
    BluetoothSend("Received Control:" + controlname)
def BluetoothSend(t):
    client_sock.send(str(t))
    client_sock.send("\n")
def setlight():
    if mode == "l":
        GPIO.output(LightL, True)
        GPIO.output(LightR, False)
    elif mode == "r":
        GPIO.output(LightL, False)
        GPIO.output(LightR, True)
def switchmode():    
    if mode == "l":
        mode = "r"
    elif mode == "r":
        mode = "l"
    else:
        print("Error:Mode is not well-setted")
    for i in range(10):
        time.sleep(0.1)
        GPIO.output(LightL, True)
        GPIO.output(LightR, True)
        time.sleep(0.1)
        GPIO.output(LightL, False)
        GPIO.output(LightR, False)
    setlight()
def leftmotor(d):
    if d == 1:
        GPIO.output(push_l_p,True)
        GPIO.output(push_l_s,False)
    elif d == -1:
        GPIO.output(push_l_p,False)
        GPIO.output(push_l_s,True)
    else:
        GPIO.output(push_l_p,False)
        GPIO.output(push_l_s,False)
def rightmotor(d):
    if d == 1:
        GPIO.output(push_r_p,True)
        GPIO.output(push_r_s,False)
    elif d == -1:
        GPIO.output(push_r_p,False)
        GPIO.output(push_r_s,True)
    else:
        GPIO.output(push_r_p,False)
        GPIO.output(push_r_s,False)
def usemotor(d):
    if mode == "l":
        leftmotor(d)
    elif mode == "r":
        rightmotor(d)
    else:
        print("Error:Mode is not well-setted")
    return 0




palse = 0
GPIO.output(LightS,False)
setlight()
while True:
    if GPIO.input(switch) == 1:  #Press switch
        t = 0
        while GPIO.input(switch) == 1 and t < 100:
            time.sleep(0.05)
            t += 1
        if t == 100:
            for i in range(12):
                time.sleep(0.2)
                GPIO.output(LightL, False)
                GPIO.output(LightR, False)
                time.sleep(0.2)
                GPIO.output(LightL, True)
                GPIO.output(LightR, True)
            if ConnectMode == "S":
                server.setup()
            else:
                for i in range(20):
                    GPIO.output(LightS,True)
                    time.sleep(0.1)
                    GPIO.output(LightS,False)
                    time.sleep(0.2)
                bluetoothsetup()
        else:
            switchmode()
        time.sleep(1)
    change = GPIO.input(bt_p) - GPIO.input(bt_s)
    usemotor(change)
    if ConnectMode == "B":
        recvdata = client_sock.recv(1024)
        print("received data:" + recvdata)
        if recvdata == "EXITBLUETOOTHDISCONNECT":
            print("Connection Lost")
            GPIO.output(LightS,False)
            print("Press Button Mode for 5 sec to repair")
        else:
            BluetoothOnReceive(recvdata)
