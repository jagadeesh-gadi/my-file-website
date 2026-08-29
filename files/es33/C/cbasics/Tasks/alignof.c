#include <stdio.h>

int main()
{
    int a;
    double b;
    printf("%zu\n",sizeof(int));
    printf("%zu\n",_Alignof(int));
    printf("%p\n",(void *)&a);
    
    printf("%zu\n", sizeof(double));
    printf("%zu\n",_Alignof(double) );
    printf("%p\n",(void *)&b);

    return 0;
}