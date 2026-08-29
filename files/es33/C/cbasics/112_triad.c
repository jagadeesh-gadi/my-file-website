#include <stdio.h>

int main()
{
    int m, n, p, i;
    int a[10];
    for (int num = 100; num <= 999 / 3; num++)
    {
        m = num;
        n = 2 * num;
        p = 3 * num;

        if (n > 999 || p > 999)
            continue;

        for (i = 0; i <= 9; i++)
        {
            a[i] = 0;
        }

        int temp = m;
        while (temp > 0)
        {
            a[temp % 10]++;
            temp /= 10;
        }
        temp = n;
        while (temp > 0)
        {
            a[temp % 10]++;
            temp /= 10;
        }
        temp = p;
        while (temp > 0)
        {
            a[temp % 10]++;
            temp /= 10;
        }

        int flag = 1;
        for (int i = 1; i <= 9; i++)
        {
            if (a[i] != 1)
            {
                flag = 0;
                break;
            }
        }

        if (flag)
            printf("%d %d %d\n", m, n, p);
    }

    return 0;
}
