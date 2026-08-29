#include <stdio.h>

int main()
{
    int n;
    int i;
    scanf("%d", &n);

    // very that using bits how many it was printing
    for (int i = 0; i < n; i++)
        printf("%d i value printf %d\n", i, (1 << n) & 1);

    // by printing the values without mention the uodate statment
    for (i = 0; i < n;)
        printf("%d i value printf\n", i);
    i++;

    //   print the values in the reverse order
    for (i = n; i > 0; i--)
        printf("%d i value printf\n", i);

    // using the break statment in the loop to break the loop

    for (i = n;; i++)
    {
        if (i == 3)
        {
            break;
        }
    }
    printf("%d i value printf\n", i);

    // cointnue operation in the given value to skip that particular number
    for (i = 0; i < n; i++)

    {
        if (i == 3)
        {
            continue;
        }
        printf("%d i value printf\n", i);
    }

    // by printing the star operator in the update speed

    for (i = 0; i < n; i++, printf("*"))

    {
    }

    return 0;
}