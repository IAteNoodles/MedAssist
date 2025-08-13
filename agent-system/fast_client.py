import asyncio
from fastmcp import Client

async def test_llm_health_server():
    """Test the LLM Health server"""
    client = Client("http://0.0.0.0:8005/mcp/")
    
    try:
        async with client:
            print("=== Testing LLM Health Server ===")
            
            # List available tools
            tools = await client.list_tools()
            print(f"Available tools: {[tool.name for tool in tools]}")
            
            # Test Get Patient Data
            print("\n--- Testing Get Patient Data ---")
            result = await client.call_tool("Get Patient Data", {"patient_id": 4})
            print(f"Patient Data: {result}")
            
            # Test Get EMH
            print("\n--- Testing Get EMH ---")
            result = await client.call_tool("Get EMH", {"patient_id": 4})
            print(f"EMH: {result}")
            
            # Test Get Lab Reports
            print("\n--- Testing Get Lab Reports ---")
            result = await client.call_tool("Get Lab Reports", {"patient_id": 4})
            print(f"Lab Reports: {result}")
            
    except Exception as e:
        print(f"Error testing LLM Health server: {e}")

async def test_hospital_db_server():
    """Test the Hospital DB server"""
    client = Client("http://0.0.0.0:8000/mcp/")
    
    try:
        async with client:
            print("\n=== Testing Hospital DB Server ===")
            
            # List available tools
            tools = await client.list_tools()
            print(f"Available tools: {[tool.name for tool in tools]}")
            
            # Test execute query
            print("\n--- Testing Execute Query ---")
            result = await client.call_tool("execute_query", {"query": "SELECT * FROM patients LIMIT 2;"})
            print(f"Query Result: {result}")
            
    except Exception as e:
        print(f"Error testing Hospital DB server: {e}")

async def main():
    await test_llm_health_server()
    await test_hospital_db_server()

if __name__ == "__main__":
    asyncio.run(main())