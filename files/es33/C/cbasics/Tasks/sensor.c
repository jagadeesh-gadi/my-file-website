// Q1. Problem Statement 20M
// Write a C program to implement a simple Sensor Status Processing System for an
// embedded device.
// The system monitors 2 sensors and stores the following information:
// • Sensor name
// • Sensor ID
// • Sensor temperature
// • Sensor status
// Store the sensor names, IDs, temperatures, and status values using appropriate arrays.
// • Display the details of all sensors.
// • Implement a function that updates the status byte by:
// • Clearing the Error bit.
// • Setting the Data Ready bit.
// • Setting the Enabled bit.
// • Keeping the sensor mode unchanged.
// • Display the updated status of each sensor after performing the required bit
// manipulations.
// • Bit 0 → Sensor Enabled
// • Bit 1 → Sensor Error
// • Bit 2 → Data Ready
// • Bit 3 → Calibration Required
// • Bits 4-7 → Sensor Mode
// • Sensor 1:
// name : Temperature
// ID : 101
// Temperature : 32.5
// Status : 0x25
// • Sensor 2:
// name : Pressure
// ID : 102
// Temperature : 45.2
// Status : 0x13

#include <stdio.h>
#define n 2
unsigned int updateStatus(unsigned char status)
{

    status &= ~(1 << 1);

    status |= (1 << 2);

    status |= (1 << 0);
    return status;
}

int main()
{
    char *name[n] = {"Temperature", "pressure"};
    int id[n] = {101, 102};
    float temp[n] = {32.5, 45.2};
    unsigned char status[n] = {0x25, 0x13};

    int i;
    for (i = 0; i < n; i++)
    {
        printf("\nSensor %d\n", i + 1);
        printf("name :%s\n", name[i]);
        printf("id :: %d\n", id[i]);
        printf("temprature :: %.2f\n", temp[i]);
        printf("status :: %0x\n", status[i]);
    }
    for (i = 0; i < n; i++)
    {
        status[i] = updateStatus(status[i]);
    }
    printf("\nAfter Update:\n");
    for (i = 0; i < n; i++)
    {
        printf("status[%d] = 0x%x\n", i, status[i]);
    }
}
