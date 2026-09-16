#include <stdio.h>

int main()
{
    char str[20];
    int a;

    FILE *fp = fopen("text.txt", "r+");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    printf("\n========= Using fscanf =========\n");

    while (fscanf(fp, "%5s", str) == 1)
    {
        printf("%s", str);
    }
    printf("\n");
    rewind(fp);

    printf("\n========= Using fgetc =========\n");

    while ((a = fgetc(fp)) != EOF)
    {
        printf("%c", a);
    }

    rewind(fp);

    printf("\n========= Using fgets =========\n");

    while (fgets(str, sizeof(str), fp) != NULL)
    {
        printf("%s", str);
    }

    fclose(fp);

    return 0;
}