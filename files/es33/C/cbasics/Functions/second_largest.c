#include <stdio.h>
int largest(int n)
{
    int lag = 0, sec = 0, third = 0;
    while (n != 0)
    {
        int num;

        num = n % 10;

        if (num > lag)
        {
            sec = lag;
            lag = num;
        }
        else if (num > sec && num != lag)
        {
            sec = num;
        }
        else if (num > third && num != sec && num != lag)
        {
            third = num;
        }
        n /= 10;
    }
    printf("Second Largest = %d\n", sec);
    printf("third Largest = %d\n", third);
}
int main()
{
    int j;
    scanf("%d", &j);
    largest(j);

    return 0;
}