#include <stdio.h>

int main()
{
    int a,b,c,middle;
    scanf("%d%d%d",&a,&b,&c);
    if((a>b && a<c) || (a<b && a>c)){
        middle =a;
    }
    else if ((b>a && b<c)||(b<a && b>c))
    {
        middle =b;
    }
    else{
        middle =c;
    }
    
    printf("middle value %d\n",middle);
    return 0;
}