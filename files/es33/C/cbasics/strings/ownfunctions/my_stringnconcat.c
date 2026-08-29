#include <stdio.h>
void strconcat(char *des, char *sour, int n)
{
    char *p1 = des;
    char *p2 = sour;
    while (*p1 != '\n')
    {
        p1++;
    }

    while (*p2 != '\0' && n > 0)
    {
        *p1 = *p2;
        p1++;
        p2++;
        n--;
    }
    printf("soucr of the string :: %s\n", des);
    *p2 = '\0';
}
int main()
{
    char des[20];
    char sour[20];
    int n = 5;
    fgets(des, 20, stdin);
    fgets(sour, 20, stdin);
    strconcat(des, sour, n);

    return 0;
}