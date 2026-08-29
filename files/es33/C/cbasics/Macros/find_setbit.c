// try to find the particluar set bit given number using MACROS

#include <stdio.h>
#define SET_BIT(num, pos) ((num) >> (pos) & 1)
int main()
{
    int num, pos, count = 0;
    scanf("%d%d", &num, &pos);
    for (int i = 0; i < 32; i++)
    {
        if (SET_BIT(num, i))
            count++;
    }

    printf("Set bits = %d\n", count);

    return 0;
}

// example :: 10 --> 1010s