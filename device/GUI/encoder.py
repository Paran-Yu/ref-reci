import RPi.GPIO as GPIO
import time

class Encoder:
    def __init__(self):
        self.SW = 23         # switch
        self.DT = 27         # signal
        self.CLK = 22        # clock

        self.oldCLK = 0
        self.oldDT = 0

        self.main()

    def setup(self):
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        
        GPIO.setup(self.SW, GPIO.IN)
        GPIO.setup(self.DT, GPIO.IN)
        GPIO.setup(self.CLK, GPIO.IN)


    def get_direction(self):
        direction = 0
        newCLK = GPIO.input(self.CLK)
        newDT = GPIO.input(self.DT)
        # if clk low -> high => change direction
        if (newCLK != self.oldCLK):
                if(self.oldCLK == 0):
                        direction = self.oldDT * 2 - 1
        self.oldCLK = newCLK
        self.oldDT = newDT

        # CW: -1, CCW: +1
        return direction

    # def main(self):
    #     self.setup()
    #
    #     while True:
    #         print("SWITCH: %d  ROTATE: %d" % (GPIO.input(self.SW), self.get_direction()))
    #         time.sleep(0.01)



