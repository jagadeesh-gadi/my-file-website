// Read three numbers and find the largest using the conditional operator.
#include <stdio.h>

int main()
{
    int n, m, o;
    scanf("%d%d%d", &n, &m, &o);
    if (n > m && n > o)
    {
        printf("n is lagrest number %d\n", n);
    }
    else if (m > n && m > o)
    {
        printf("m is lagrest number %d\n", m);
    }
    else
    {
        printf("o is largest number %d\n", o);
    }

    // smallest numebr

    if (n < m && n < o)
    {
        printf("n is smallest number %d\n", n);
    }
    else if (m < n && m < o)
    {
        printf("m is smallest number %d\n", m);
    }
    else
    {
        printf("o is smallest number %d\n", o);
    }
    return 0;
}