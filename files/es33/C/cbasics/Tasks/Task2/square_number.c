#include <stdio.h>

int main()
{
    int j, n, sum = 0;
    printf("enter number of squares :: ");
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
    {

        for (j = 1; j <= n; j++)
        {
            if (j == i)
            {
                 sum=sum+j*i;
            }
           
        }
        printf("sum of %d square  = %d\n",i,sum);
    }

    return 0;
}