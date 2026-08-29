#include <stdio.h>

int main()
{
    int x,a,b,s;
    scanf("%d%d%d%d",&x,&a,&b,&s);
    // if(s = a<=b||b!=x){
    //     printf("%d\n",s);
    // }
    // x *= a+b;
//    int y= x *(a+b);
     x = x*a+b/s;
    printf("%d\n",x);
    //  printf("%d\n",y);
    //  printf("%d\n",z);
    return 0;
}