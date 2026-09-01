#include <stdio.h>
#include "sensor.h"
int main()
{
    sensorstatus s = SENSOR_OFF;
    sensorstatus *ptr = &s;

    float temp;
    if (*ptr < 0)
    {
        printf("SENSOR_OFF");
    }
    else if (*ptr > 0 && *ptr < 20)
    {
        printf("SENOR_INTILIZATION");
    }

    return 0;
}