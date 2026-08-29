#include <stdio.h>

int main()
{
    short int x = 10;
    unsigned int u = 40000U;
    long int z = 1234567890L;
    long long int y = 123456789012345LL;

    printf("short ==  %hd\n", x);
    printf("unsigned == %u\n", u);
    printf("long int == %ld\n", z);
    printf("long long int == %lld\n", y);

    return 0;
}