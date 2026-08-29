#include <stdio.h>
volatile int flag=0;
int main()
{    
    printf("initial flag value == %d\n",flag);

    flag +1;
    printf("after the flag value == %d\n",flag);
    
    while (flag ==0)
    {
        printf("%d",flag);
    }
    printf("flag changed");
    

    return 0;
}