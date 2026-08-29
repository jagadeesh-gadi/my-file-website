#include <stdio.h>

int main()
{
    int n;
    int i = 0;
    scanf("%d", &n);

    //   print the values of the while loop upto the n numbers
    // while (i <= n)
    // {
    //     printf("%d\n", i);
    //     i++;
    // }

    // print the values as the reverse order
    //  while ( n)
    // {
    //     printf("%d\n", n);
    //     n--;
    // }

    // infinate ittrations was occur in this loop
    //  while (i <= n)
    // {
    //     printf("%d\n", i);

    // }

    // due to break the loop break after on itteration
    // while (i)
    // {
    //     break;
    // }
    // printf("%d\n", i);

    // in this break the loop after the 3 ittration if it matches to i value
    //   while (i<n)
    // {
    //     if(i==3)
    //     break;
    //     printf("%d\n", i);
    //     i++;
    // }

    // pre increament opeerator was perfrom and print the output as 1,2,3,4 if "i=0"
    // while (++i < n)
    // {
    //     printf("%d\n", i);

    // }

    // post decrement operator was perform infinite loops to print the i value
    //    while (i-- < n)
    // {
    //     printf("%d\n", i);

    // }

    // post increment operation print the values in the loop and increment
    //  while (i++ < n)
    //  {
    //      printf("%d\n", i);
    //  }

    // if the n value is greater than 100 it will print infinte loop
    // if the n value is less than 100 it will print the value as nothing
    // while (n > 100)
    // {
    //     printf("%d\n", n);
    // }

    // it will print the values in shift operation then it will print binary value reamaining
    while (n)
    {

        printf("%d", n & 1);
        n >>= 1;
    }
    return 0;
}