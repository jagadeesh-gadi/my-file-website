#include <stdio.h>

int main()
{
    char str[100];
    FILE *fp;
    fp = fopen("some.txt", "r+");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    printf("\n========= Using r+ =========\n");

    fgets(str, sizeof(str), fp);
    printf("%s", str);

    fclose(fp);
    return 0;
}