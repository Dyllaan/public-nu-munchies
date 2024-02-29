<?php

use Dotenv\Dotenv;

class AppConfig
{
    /**
     * Holds the loaded environment variables.
     *
     * @var array
     */
    protected $variables = [];

    /**
     * Constructor.
     *
     * Loads environment variables upon object creation.
     */
    public function __construct()
    {
        $this->loadEnvironmentVariables();
    }

    /**
     * Loads environment variables from a .env file or the system's environment.
     */
    protected function loadEnvironmentVariables()
    {
        // Check if .env file exists in the project root.
        $dotenvPath = dirname(__DIR__, 2); // Go up two directories from the current directory.
        if (file_exists($dotenvPath . '/.env')) {
            $dotenv = Dotenv::createImmutable($dotenvPath);
            $dotenv->load();
        }

        // Load all environment variables into the variables array.
        $this->variables = $_ENV;
    }

    /**
     * Retrieves the value of an environment variable.
     *
     * @param string $key The key of the environment variable.
     * @param mixed $default The default value to return if the key does not exist.
     * @return mixed The value of the environment variable or the default value.
     */
    public function get($key, $default = null)
    {
        if (!array_key_exists($key, $this->variables)) {
            throw new Exception("The environment variable '$key' does not exist.");
        }
        return $this->variables[$key] ?? $default;
    }
}
