#include <stdio.h>
#include "Bitwise.h"

int main()
{
    int a;
    printf("enter a values to perform right_shit ::\n");
    scanf("%d", &a);
    printf("values of a == %d\t\t\n", a);
    bit_pattern(a);

    printf("Right shift a == %d\t\t \n", (a >> 2));
    bit_pattern(a >> 2);
    return 0;
}