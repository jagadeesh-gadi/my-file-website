#include <stdio.h>
#include <unistd.h> 

int main()
{
  char path[1026];
   if (getcwd(path, sizeof(path)) != NULL)
        printf("Current directory: %s\n", path);
    return 0;
}