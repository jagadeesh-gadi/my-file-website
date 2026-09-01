#include <stdio.h>
#include "sensor.h"

int main()
{
    sensorstatus s = SENSOR_OFF;
    sensorstatus *ptr = &s;

    for (int i = 0; i < 4; i++)
    {
        switch (*ptr)
        {
        case SENSOR_OFF:
            printf("Sensor OFF = %d\n", *ptr);
            *ptr = SENSOR_INITILIZE;
            break;

        case SENSOR_INITILIZE:
            printf("Sensor INITIALIZE = %d\n", *ptr);
            *ptr = SENSOR_READY;
            break;

        case SENSOR_READY:
            printf("Sensor READY = %d\n", *ptr);
            *ptr = SENSOR_READING;
            break;

        case SENSOR_READING:
            printf("Sensor READING = %d\n", *ptr);
            break;
        }
    }

    return 0;
}