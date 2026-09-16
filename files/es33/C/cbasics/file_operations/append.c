#include <stdio.h>

int main()
{
    char c[100];

    FILE *fp = fopen("some.txt", "a");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    printf("Enter text to append: ");
    fgets(c, sizeof(c), stdin);

    fputs(c, fp);

    fclose(fp);

    printf("Data appended successfully\n");

    return 0;
}