#include <stdio.h>
void strconcat(char *des, char *sour)
{
    char *p1 = des;
    char *p2 = sour;
    while (*p1 != '\0')
    {
        p1++;
    }

    while (*p2 != '\0')
    {
        *p1 = *p2;
        p1++;
        p2++;
    }
    printf("soucr of the string :: %s", des);
    *p2 = '\0';
}
int main()
{
    char des[20];
    char sour[20];
    fgets(des, 20, stdin);
    fgets(sour, 20, stdin);
    strconcat(des, sour);

    return 0;
}