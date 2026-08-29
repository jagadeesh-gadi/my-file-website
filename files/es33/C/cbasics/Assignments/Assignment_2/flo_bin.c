#include <stdio.h>

int main()
{
    float n, f;
    int i;
    scanf("%f", &n);
    i = (int)n;
    f = n - i;
    printf("%d\n", i);
    printf("%f\n", f);

    int a[30], j = 0;
    while (i > 0)
    {
        a[j++] = i % 2;
        i /= 2;
        //  printf("%d", a[i]);
    }

    for (int k = j - 1; k >= 0; k--)
    {
        printf("%d", a[k]);
    }

    printf(".");

    for (int k = 0; k < 5; k++)
    {
        f = f * 2;
        if (f >= 1)
        {
            printf("1");
            f = f - 1;
        }
        else
        {
            printf("0");
        }
    }
    printf("\n");
    return 0;
}

