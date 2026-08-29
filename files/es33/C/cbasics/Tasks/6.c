#include <stdio.h>
#include <stdint.h>

int main()
{
    uint8_t a = 200, b = 100;
    int sum = a + b;

    printf("%d\n", sum);
    uint8_t wrapped = a + b;
    printf("%d\n", wrapped);

    return 0;
}