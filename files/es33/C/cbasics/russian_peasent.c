#include <stdio.h>

int main()
{
    int a, b, s = 0, x, y;
    scanf("%d%d", &a, &b);
    // a=x;
    // b=y;

    //russian peasent number 
    while (a > 0)
    {
        if (a % 2 != 0)
        {
            s = s + b;
        }
        a = a / 2;

        b = b * 2;
      
    }
      printf("sum of numbers :: %d\n", s);
    return 0;
}