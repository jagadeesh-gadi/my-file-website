// write a program to print the all oddd position number to "0" and remaining should be normal way and also i need to print in the single method only

#include <stdio.h>

int replaceOdd(int n, int pos)
{
    if (n == 0)
        return 0;

    int num = replaceOdd(n / 10, pos + 1);

    if (pos % 2 != 0)
        return num * 10 + 0;
    else
        return num * 10 + (n % 10);
}

int main()
{
    int n;
    int pos;
    // scanf("%d", &pos);
    printf("enter the number and pos  valuse :: ");
    scanf("%d%d", &n, &pos);

    int result = replaceOdd(n, pos);

    printf("%d\n", result);

    // printf("%09d\n", result);

    return 0;
}

// #include <stdio.h>
// int odd_number(int n, int rev)
// {
//     if (n == 0)
//         return 0;
//     int rem = n % 10;
//     int r = (rev * 10 + rem);
//     if (r % 2 != 0)
//     {
//         return r;
//     }
//     else
//     {
//         return 0;
//     }
// }

// int main()
// {
//     int n;
//     scanf("%d", &n);
//     printf("%d", odd_number(n, 0));

//     printf("\n");
//     return 0;
// }