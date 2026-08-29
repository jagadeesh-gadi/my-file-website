#include <stdio.h>

int main()
{
    unsigned char a = 12;
    unsigned char b = 10;

    printf("%d\n", a);
    printf("%d\n", b);

    printf("_____BITWISE OPERATIONS ________\n");

    printf("value of AND == %d\n", a & b);
    printf("value of OR  == %d\n", a | b);
    printf("value of XOR == %d\n", a ^ b);
    printf("value of UNSIGNED CHAR NOT == %u\n", (unsigned char)~a);
    printf("value of RIGHT SHIFT == %d\n", a >> 1);
    printf("value of LEFT SHIFT == %d\n", a << 1);
    return 0;

    
    // int i,index=0;
    // for(i=0;i<10;i++){
    //     int i=0;
    //     while(i++<5){
    //         index ++;
    //          printf("%d\n is index :: %d\n",i,index);
    //         // printf("%d\n",index);
}
