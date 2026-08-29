#include <stdio.h>
#include<stdint.h>

typedef unsigned long ulong_t;

int main()
{

    // char value size finding using the increament operator
    char c;
    printf("char size == %zu\n",sizeof(c));
    printf("char of (+c) == %zu\n",sizeof(c+1));
    

    // short value size finding using the increment operator
    short int a=10;
    printf("size of short == %zu\n",sizeof(a));
    printf("size of short == %zu\n",sizeof(a+1));


    //unsigned uisng the typedef operator using the long value to incress the count value
    ulong_t count =100000UL;
    printf("the value of the unsgigned typedef == %lu\n",count);

    count ++;
       printf("after the count++ value of the unsgigned typedef == %lu\n",count);
    return 0;
}