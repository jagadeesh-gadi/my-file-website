#include <stdio.h>

int main()
{
    int n, sum = 0, rem;

    printf("Enter a number: ");
    scanf("%d", &n);

   
    while (n != 0)
    {
        rem = n % 10;
        sum = sum + rem;
        n = n / 10;
    }

    while (sum > 9)
    {
        int temp = sum;
        sum = 0;

        while (temp != 0)
        {
            rem = temp % 10;
            sum = sum + rem;
            temp = temp / 10;
        }
    }

    printf("Final sum = %d\n", sum);

    return 0;
}