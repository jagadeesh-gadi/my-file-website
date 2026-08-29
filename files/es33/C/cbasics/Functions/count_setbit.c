// count number of set bits and also based on setbits i need to pefrom the itterations
#include <stdio.h>
int setbit(int n)
{
    int count = 0;
    int itr = 0;
    while (n)
    {
        itr++;
        n &= (n - 1);
        count++;
    }
    printf("%d %d\n", count, itr);
}
int main()
{
    int x;
    scanf("%d", &x);
    setbit(x);

    return 0;
}